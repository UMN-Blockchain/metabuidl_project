# DEMO
from getpass import getpass
import secret_sharing as ss
import secure_math as sm
def main():
  # string encoding
  key = sm.encode_str("blueberry")
  print(key, sm.decode_int(key))

  # pairing
  x, y = int(input("Number 1: ")), int(input("Number 2: "))
  paired = sm.pair(x, y)
  print(f"Paired: {paired}")
  unpaired = sm.unpair(paired)
  print(f"Unpaired: {unpaired}")

  # sharing
  private_key = sm.encode_str(getpass("Enter your private key: ")) # hidden input
  num_shares = int(input("Enter number of custodians: "))
  sharer = ss.SharimSecretSharer()
  shares = sharer.create_shares(private_key, num_shares)
  for i, share in enumerate(shares):
    custodian = chr(i + ord('A')) # a, b, c, ...
    print(f"Custodian {custodian}: {share}")

  # recovering
  recovered_key = sharer.recover_key(shares)
  print(f"recovered: {recovered_key}")
  recovered_pkey = sm.decode_int(recovered_key)
  print(f"These shares correspond to {recovered_pkey}")

  # sharing and recovering with minimum shares
  private_key = sm.encode_str(getpass("Enter your less private key: ")) # hidden input
  num_shares = int(input("Enter number of custodians: "))
  minimum = num_shares-1
  sharer = ss.SharimSecretSharer()
  shares = sharer.create_shares(private_key, num_shares, minimum)
  for i, share in enumerate(shares):
    custodian = chr(i + ord('A')) # a, b, c, ...
    print(f"Custodian {custodian}: {share}")

  # recovering
  print(f"Recovering with first {minimum} shares")
  recovered_key = sm.decode_int(sharer.recover_key(shares[:-1]))
  print(f"Recovered with first {minimum} shares: {recovered_key}")
  recovered_key = sm.decode_int(sharer.recover_key(shares[1:]))
  print(f"Recovered with last {minimum} shares: {recovered_key}")
  recovered_key = sm.decode_int(sharer.recover_key(shares))
  print(f"Recovered with all shares: {recovered_key}")
  try:
    recovered_key = sm.decode_int(sharer.recover_key(shares[2:]))
    print(f"Recovered with too few shares: {recovered_key}")
  except UnicodeDecodeError:
    print(f"Too few shares (supposed to happen)")

if __name__ == "__main__":
  main()
