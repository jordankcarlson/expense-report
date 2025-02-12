javascript:(function(){
  let sites = ["staples.com", "grainger.com"];
  sites.forEach(site => {
    navigator.permissions.query({ name: "popups" }).then(result => {
      if (result.state !== "granted") {
        console.log(`Manually add: ${site}`);
      }
    });
  });
})();