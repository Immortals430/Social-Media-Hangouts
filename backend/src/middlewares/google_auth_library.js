import { google } from 'googleapis';
const people = google.people('v1');


async function verifyToken(req, res, next) {
  const token =req.headers['authorization']
  try {

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    
    const { data } = await people.people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses',
      auth: oauth2Client,
    });
    
    req.user = data
    next();
  } catch (error) {
    console.log(error)
    next(err)
  }
}

export default verifyToken
