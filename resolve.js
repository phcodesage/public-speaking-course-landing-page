const dns = require('dns');
dns.setServers(['8.8.8.8']);
dns.resolveTxt('public-speaking.wzjocs4.mongodb.net', (err, txt) => {
  console.log("TXT:", txt);
});
dns.resolveSrv('_mongodb._tcp.public-speaking.wzjocs4.mongodb.net', (err, addresses) => {
  if (err) {
    console.error(err);
  } else {
    console.log("SRV:", addresses);
  }
});
