import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "@mui/icons-material";

function App() {
  const [queryWord, setQueryWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${
          queryWord ? queryWord : "random"
        }&client_id=Az8AOSgPXWd1BuHx6_5g361bcbIKxF2nf_wJeVr_0Og`
      );
      setImageList(data.results);
      console.log(data.results);
    };
    let ignore = false;
    if (!ignore) {
      getImages();
    }
    return () => {
      ignore = true;
    };
  }, [queryWord]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="header">
        <input
          className="inputField"
          type="text"
          placeholder="Search..."
          onChange={(e) => setInputWord(e.target.value)}
        />
        <button
          className="searchButton"
          type="button"
          onClick={(e) => setQueryWord(inputWord)}
        >
          <Search />
        </button>
      </div>
      <ImageList sx={{ ml: 2, mr: 2 }} variant="masonry" cols={3} gap={8}>
        {imageList.length > 0 ? (
          imageList.map((item) => {
            return (
              <ImageListItem key={item.id}>
                <img
                  srcSet={`${item.urls.thumb}?w=248&auto=format&dpr=2 2x`}
                  alt={item.alt_description}
                  loading="eager"
                />
                <ImageListItemBar
                  title={`By ${item.user.name}`}
                  subtitle={item.user.location}
                />
              </ImageListItem>
            );
          })
        ) : (
          <h3 className="loadingText">Loading...</h3>
        )}
      </ImageList>
    </Box>
  );
}

export default App;
