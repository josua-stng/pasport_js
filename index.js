import express from 'express';
import session from 'express-session';
import { passport } from './passport.js';
const app = express();
const PORT = 3000;
const local = 'localhost';

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'im_a_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 100 }, //one hour
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index',{user:req.user});
});

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.listen(PORT, () => {
  console.log(`Your server running at http://${local}:${PORT}`);
});
