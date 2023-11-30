const express = require("express");
const cors = require("cors");
const { ThirdwebSDK, SUPPORTED_CHAIN_IDS, ChainId } = require("@thirdweb-dev/sdk");
const { Mumbai } = require("@thirdweb-dev/chains");
// Import the built-in express.json middleware
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const sdk = new ThirdwebSDK("mumbai", {
  secretKey:
    "ovf9SE0Aj0wAhjMDmGU0rkbc0twJfIBs3gxqV29yWnlk5kPZfyHA1bnqkFSzqTXoCKSdIOBz9FqOATtAxb9O1Q",
});

// Allow only specific origins, in this case, http://localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET", // specify the methods you want to allow
};

app.use(cors(corsOptions));

// Use the express.json middleware to parse JSON bodies
app.use(express.json());

// Use the express.urlencoded middleware to parse URL-encoded bodies

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let data = await sdk.getContract(
      "0x9E21C72DEad8cF0Bf110Eca7987cB78AbBF63c03",
      "nft-collection"
    );
    data = await data.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/getOwnedNFTs", async (req, res) => {
  let address = req.body.address;
  console.log("body",req.body);
  try {
    let data = await sdk.getContract(
      "0x9E21C72DEad8cF0Bf110Eca7987cB78AbBF63c03",
      "nft-collection"
    );
    data = await data.getOwned(String(address));
    console.log(data)
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/mintNFT", async (req, res) => {
  // let address = req.body.address;
  console.log(JSON.parse(req.body.signer));
 
  const signer = JSON.parse(req.body.signer);
  const sdkSigner = ThirdwebSDK.fromSigner(
    signer,
    Mumbai,
    {
      secretKey:
        "ovf9SE0Aj0wAhjMDmGU0rkbc0twJfIBs3gxqV29yWnlk5kPZfyHA1bnqkFSzqTXoCKSdIOBz9FqOATtAxb9O1Q",
    }
  ); 
  try {
    let data = await sdkSigner.getContract(
      "0x9E21C72DEad8cF0Bf110Eca7987cB78AbBF63c03",
      "nft-collection"
    );
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
    const metadata = {
      name: "Cool NFT",
      description: "This is a cool NFT",
      image: "Testing", // This can be an image url or file
    };

    const tx = await data.erc721.mint(metadata);
    const receipt = tx.receipt; // the transaction receipt
    const tokenId = tx.id; // the id of the NFT minted
    const nft = await tx.data(); // (optional) fetch details of minted NFT
    res.json(tx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/getAll-AuctionListings", async (req, res) => {
  console.log("Listings")
  try {
    const contract = await sdk.getContract("0x25bC617810B520BfA4A068498Dc885516B0FA111")
    data = await contract.englishAuctions.getAllValid();
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
}
) 
app.post("/getWinner-AuctionListings", async (req, res) => {
  console.log("Listings")
  let address = req.body.auctionId;
  try {
    const contract = await sdk.getContract("0x25bC617810B520BfA4A068498Dc885516B0FA111")
    data = await contract.englishAuctions.getWinner(auctionId);
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
}
)
app.post("/getbyID-AuctionListings", async (req, res) => {
  console.log("Listings")
  let auctionId = req.body.auctionId;
  try {
    const contract = await sdk.getContract("0x25bC617810B520BfA4A068498Dc885516B0FA111")
    data = await contract.englishAuctions.getAuction(auctionId);
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
}
)

app.post("/getWinningBid-AuctionListings", async (req, res) => {
  console.log("Listings")
  let auctionId = req.body.auctionId;
  try {
    const contract = await sdk.getContract("0x25bC617810B520BfA4A068498Dc885516B0FA111")
    data = await contract.englishAuctions.getWinningBid(auctionId);
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
}
)

app.post("/getHighestBid-AuctionListings", async (req, res) => {
  console.log("Listings")
  let auctionId = req.body.auctionId;
  try {
    const contract = await sdk.getContract("0x25bC617810B520BfA4A068498Dc885516B0FA111")
    data = await contract.englishAuctions.getMinimumNextBid(auctionId);
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
}
)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
