import { Button, CircularProgress, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGithubReposStore } from '../../store/githubRepos'
import RepoItem from '../RepoItem/RepoItem'

function RepoList() {
    const { username } = useParams()
    const [page, setPage] = useState(1);
    const {repos, loading, isEnd, getRepos, resetRepos } = useGithubReposStore()
    useEffect(() => {
        getRepos(username,page)
    }, [getRepos, page, username])
    
    useEffect(() => {
        return () => {
            resetRepos();
        }
    }, [resetRepos])
    const loadMore = useCallback(() =>setPage((prevPage) => prevPage + 1),[])
  return (
    <>
      {repos.length > 0 ? (
        <Typography variant="h4" textAlign="center">
          Github Repository List
        </Typography>
      ) : null}
      {repos.map((repo, index) => (
        <RepoItem repo={repo} key={index} />
      ))}
      {loading ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress sx={{margin: 'auto'}} size={50} />
        </div>
      ) : isEnd ? null : (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{margin: '10px'}} onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}

export default RepoList
