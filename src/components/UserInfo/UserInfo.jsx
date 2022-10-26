import React, {useCallback, useEffect} from 'react';
import {Avatar, Button, Card,CardContent, CircularProgress, Typography, Link} from '@mui/material';
import {useGithubUserStore} from './../../store/githubUser';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function UserInfo() {
  const {
    user: {
      avatar_url,
      name,
      html_url,
      company,
      blog,
      location: locationInfo,
      email,
      hireable,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    },
    loading,
    getUser,
  } = useGithubUserStore();
  const {username} = useParams();
  const location = useLocation();
    const navigate = useNavigate();
    
  useEffect(() => {
    getUser(username);
  }, [getUser, username]);
    
  const onClickNavigateToList = useCallback(() => {
    console.log(location.state);
    if (!location.state) navigate('/');
    else {
      navigate({
        pathname: '/',
        search: !!location.state?.previous
          ? `?q=${location.state?.q}&page=${location.state?.previous}`
          : `?q=${location.state?.q}`,
      });
    }
  }, [location.state, navigate]);

  if (loading) {
    return <CircularProgress sx={{marginLeft: 'auto', marginRight: 'auto', marginTop: '200px'}} />;
  } else {
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button
            style={{margin: '10px', display: 'flex'}}
            onClick={onClickNavigateToList}
            startIcon={<ArrowBackIcon />}
          >
            GitHub User List로 돌아가기
          </Button>
        </div>

        <Card variant="outlined" sx={{margin: '10px'}}>
          <CardContent sx={{textAlign: 'center'}}>
            <Avatar alt={name} src={avatar_url} sx={{width: '200px', height: '200px', margin: 'auto'}} />
            <Typography varient="h4" sx={{marginBottom: '50px'}}>
              {name}
            </Typography>
            <Button varient="contained" href={html_url} target="_blank" sx={{marginBottom: '30px'}}>
              GitHub Page
            </Button>
            {bio ? <Typography varient="subtitle1">자기소개 : {bio}</Typography> : null}
            {company ? <Typography varient="subtitle1">company : {company}</Typography> : null}
            {blog ? (
              <Typography varient="subtitle1">
                blog : <Link href={blog}></Link>
                {blog}
              </Typography>
            ) : null}
            {locationInfo ? <Typography varient="subtitle1">위치 : {locationInfo}</Typography> : null}
            {email ? <Typography varient="subtitle1">email : {email}</Typography> : null}
            <Typography varient="subtitle1">고용 가능 여부 : {hireable ? '예' : '아니오'}</Typography>
            <Typography varient="subtitle1">public repository 개수 : {public_repos}</Typography>
            <Typography varient="subtitle1">public gist 개수 : {public_gists}</Typography>
            <Typography varient="subtitle1">followers 수 : {followers}</Typography>
            <Typography varient="subtitle1">following 수 : {following}</Typography>
            <Typography varient="subtitle1">GitHub 생성일 : {dayjs(created_at).format('YYYY.MM.DD h:mm A')}</Typography>
            <Typography varient="subtitle1">
              최근 GitHub 업데이트 시간 : {dayjs(updated_at).format('YYYY.MM.DD h:mm A')}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default UserInfo;
