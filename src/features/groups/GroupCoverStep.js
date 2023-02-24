import React, { useState, useEffect } from 'react'

import {ButtonBase} from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import { makeStyles } from 'tss-react/mui';

import unsplashAPI from '../../api/unsplashAPI'

const useStyles = makeStyles()((theme) => {
    return {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0,
      },
    },
  },
  focusVisible: {},
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
    }})

const GroupCoverStep = ({ cover, handleCoverChange }) => {
    const { classes } = useStyles();
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [initialImgs, setInitialImgs] = useState([])
   

  // set initial images
  useEffect(() => {
    const search = async () => {
      const { data } = await unsplashAPI.get('search/photos', {
        params: { query: 'sea life' },
      })
      setInitialImgs(data.results)
    }
    search()
  }, [])

  // Fetch API 500 ms after user stops typing
  useEffect(() => {
    const search = async () => {
      const { data } = await unsplashAPI.get('search/photos', {
        params: { query: query },
      })
      setResults(data.results)
    }
    const timeoutId = setTimeout(() => {
      if (query) {
        search()
      }
    }, 500)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [query])

  const renderedImgList = () => {
    const data = results.length === 0 ? initialImgs : results
    return data.map((img) => (
      <ImageListItem key={img.id}>
        <ButtonBase
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => {
            handleCoverChange(img.urls.regular)
          }}>
          <span
            className={classes.imageSrc}
            style={{ backgroundImage: `url(${img.urls.regular})` }}
          />
          {cover !== img.urls.regular && (
            <span className={classes.imageBackdrop} />
          )}
        </ButtonBase>
      </ImageListItem>
    ))
  }

  return (
    <>
      <TextField
        autoFocus
        id="search-query-input"
        label="Search Unsplash"
        placeholder="Choose an image below or search for your own"
        margin="normal"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ImageList rowHeight={150} cols={3} className={classes.gridList}>
        {renderedImgList()}
      </ImageList>
    </>
  )
}

export default GroupCoverStep