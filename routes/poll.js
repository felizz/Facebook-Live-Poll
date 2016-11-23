/**
 * Created by kyle on 9/5/16.
 */

var express = require('express');
var router = express.Router();
var controllerPoll = require('../controllers/poll');
var midAuth = require('../controllers/middleware/auth');


/**
 * For create poll
 http://localhost:6565/api/v1/poll/create
  {
	"layout": 1,
	"reactions": ["LOVE", "HAHA"],
	"texts": ["Which option will you choose?", "option 1 - cat", "option 2 - dog"],
	"images": ["http://option1", "http://option2"]
  }
 */
router.post('/create', controllerPoll.handleCreatePoll);


/**
 * Pls. help to test
 */
router.post('/upload-image', controllerPoll.handleUploadImage);


/**
 * For updating Facebook Video Id and Stream Key
 http://localhost:6565/api/v1/poll/rkmzxWQMg/update-additional-info
 {
    "fb_video_id": "10155146593901840",
    "fb_stream_key": "test_key"
 }
 */
router.post('/:poll_id/update-additional-info', controllerPoll.updateAdditionalInfo);


/**
 * For get reaction count of the respective facebook post
 http://localhost:6565/api/v1/poll/rkmzxWQMg/reactions-count

 Sample response:
 {"like":320564,"love":62344,"wow":757,"haha":87022,"sad":380,"angry":612}
 */
router.get('/:poll_id/reactions-count', controllerPoll.getReactionsCount);


module.exports = router;