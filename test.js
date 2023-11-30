fetch("http://localhost:3001/getOwnedNFTs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    address: "0x0Dd6F513D90EFADAf7902a705509C370e6088C52",
  }),
}).then((res) => res.json()).then((res) => {
    console.log(res)
})
