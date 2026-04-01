import dns from 'dns';
import fs from 'fs';
dns.setServers(['8.8.8.8']);
dns.resolveSrv('_mongodb._tcp.public-speaking.wzjocs4.mongodb.net', (err, addresses) => {
  if (err) {
    console.error("SRV Error:", err);
  } else {
    fs.writeFileSync('dns.json', JSON.stringify(addresses));
  }
});
