import express from 'express';
import Book from '../../../model/Book';
import User from '../../../model/User';
import {authenticateToken} from '../../middlewares';
import {formatJson} from '../../utils';

const accountsRouter = new express.Router();

accountsRouter.use(authenticateToken().unless({
  useOriginalUrl: false,
  path: [],
}));

accountsRouter.get('/:username/books', (req, res) => {
  const {username} = req.params;

  Book.getShareBookSByUsername(username, (books) => {
    res.json(formatJson(
      true,
      `Get all shared books by ${username} successfully.`, {
        books,
      }
    ));
  });
});

accountsRouter.get('/:username/stars/books', async (req, res) => {
  const {username} = req.params;
  let starredBooks = null;

  try {
    starredBooks = await Book.findStarredShareBooksByUsername(username);
    res.json(formatJson(
      true,
      `Get ${username}'s starred books list successfully.'`,
      starredBooks
    ));
  } catch (e) {
    res.json(formatJson(true, `Get ${username}'s starred books list failed.'`));
  }
});

accountsRouter.get('/:username/profile', (req, res) => {
  const {username} = req.params;

  User.findUniqueUserByUsername(username, (err, profile) => {
    if (!profile) {
      res.status(404).json(formatJson(
        false,
        `Fetch ${username}'s profile failed.'`,
      ));
    } else {
      res.json(formatJson(
        true,
        `Fetch ${username}'s profile successfully.`, {
          profile,
        }
      ));
    }
  });
});

accountsRouter.post('/:username/profile', (req, res) => {
  const profile = req.body;
  User.updateUser(profile)
    .then(() => {
      res.json(
        formatJson(
          true,
          `Update ${profile.username}'s profile successfully.'`,
          {profile}
        )
      );
    })
    .catch(err => {
      res.json(formatJson(false, err.message));
    });
});

accountsRouter.post('/:username/star/:shareId', (req, res) => {
  const {username, shareId} = req.params;

  User.star(username, shareId)
    .then(() => {
      res.json(formatJson(
        true,
        `User ${username} stars share book "${shareId} successfully."`
      ));
    })
    .catch(() => {
      res.json(formatJson(
        false,
        `User ${username} stars share book "${shareId} failed."`
      ));
    });
});

export default accountsRouter;
