import axios from 'axios';

export const UseAuth = async (req, res) => {
  try {
    
    const username = "dumdum";
    const password = "G1veUs@Sign";

    const response = await axios.post('https://dev-gateway.telkomuniversity.ac.id/issueauth', {
      username: username,
      password: password
    });

    const token = await response.data.token;

    const profile = await axios.get('https://dev-gateway.telkomuniversity.ac.id/issueprofile', {
      headers: { 
        'Authorization': 'Bearer ' + token,
    }});

    res.status(200).json({ data: profile.data });

  } catch (error) {
    res.status(404).json({ msg: "Gagal Login" });
  }
};
