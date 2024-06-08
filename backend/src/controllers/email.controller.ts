import { Request, Response } from 'express';
import { syncEmailData } from '../services/email.service';


const syncEmails = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    await syncEmailData(userId);
    res.status(200).send({ message: 'Emails synchronized successfully' });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export default { syncEmails };
