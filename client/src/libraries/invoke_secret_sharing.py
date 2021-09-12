# DEMO
from getpass import getpass
import secret_sharing as ss
import secure_math as sm
import sys 

if __name__ == "__main__":
    command = sys.argv[1]
    
    sharer = ss.SharimSecretSharer()

    if command == "scramble":
        key = sys.argv[2]
        num_shares = int(sys.argv[3]) 
        minimum = int(sys.argv[4])  

        if minimum > num_shares:
            sys.exit(1) #Invalid argument

        print(" ".join([str(share) for share in sharer.create_shares(sm.encode_str(key), num_shares, minimum)]))

    elif command == "unscramble":
        shares = [int(share) for share in sys.argv[2:]]

        try:
            print(sm.decode_int(sharer.recover_key(shares)))
        except Exception as err:
            sys.exit(2) #Too few shares 

    else:
        sys.exit(3) #Invalid argument

    sys.exit(0)
    






