import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhMkE5MzU2NEQxNThhYkM3NzE5Y0Q4NjUwOEI0QjdERjYwRmZDZjciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzE4NTQwNTgxODQsIm5hbWUiOiJCbG9ja0NoYWluQ2x1YiJ9.VEXZMJs4ErdzxQTpuU-wLvXHfhx7OdaRnq6d9UAoO4s"
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

async function storeFileWeb3(file) {
  let client = makeStorageClient();
  let cid = await client.put(file);
  console.log('stored files with cid:', cid);
  return cid;
}

async function retrieve(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }

  return res;
}

export {
  storeFileWeb3,
  retrieve
}
