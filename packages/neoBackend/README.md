Example `.bashrc` setting required environment variables:

```
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=17ed8d789fds695f1118
export REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET=b76736089v0c8x9c66bb693578d4e1e2dac61baa
export REACT_APP_VIZHUB_JWT_SECRET=nm78a7s8f9d7s8f8d9s09saf7d89saf78
```

In the GitHub OAuth app, the callback URL should be

`http://localhost:3000/authenticated`