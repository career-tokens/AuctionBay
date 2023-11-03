import React, { useContext, useRef, useState, useEffect } from 'react';
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { authContext } from '../../context/authContext/authContextProvider';
import axios from 'axios';

const Profile = () => {
  const profilePictureRef = useRef();
  const { user } = useContext(authContext);

  const [productData, setProductData] = useState({
    url: "",
    description: "",
    model: "",
    username: "",
  });

  const [productList, setProductList] = useState([]);

  const handleUpload = () => {
    const PP = profilePictureRef.current;
      const imageData = PP.getData();
      const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();
    setProductData({ ...productData, url: file });
  };

  const save = async () => {
    handleUpload();
    const productDataWithUsername = { ...productData, username: user.username };
    const api = "http://localhost:4000/users/addproduct";
    const response = await axios.post(api, productDataWithUsername);

    if (response.status === 200) {
      console.log("Product saved successfully:", productDataWithUsername);
      updateProductList();
    } else {
      console.log("Error saving product");
    }
  };

  const updateProductList = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${user.username}`);
      if (response.status === 200) {
        setProductList(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  useEffect(() => {
    updateProductList();
  }, [user.username]);

  return (
    <div className="flex justify-center items-center">
      <Card className="profileCard" style={{ width: "70%" }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h6" gutterBottom>
            {user.name}
          </Typography>
          <div className="yourProducts">
            <Grid container spacing={2}>
              {productList.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card>
                    <img src={product.url.imageSrc} alt={product.model} style={{ width: "100%" }} />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {product.model}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="addProducts">
            <ProfilePicture
              ref={profilePictureRef}
              useHelper={true}
              debug={true}
              cropSize={200}
            />
            <TextField
              id="model-name"
              label="Model Name"
              variant="outlined"
              value={productData.model}
              onChange={(e) => setProductData({ ...productData, model: e.target.value })}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
            <Button variant="contained" color="success" onClick={save}>
              Save Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
