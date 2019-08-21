import Meetup from '../models/Meetup';
import File from '../models/File';


class MyMeetupController {
  async index(req, res){
    const user_id = req.userId; 
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        }
      ],
    });

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups." });
    }
    return res.json(meetup);
  }
}

export default new MyMeetupController();