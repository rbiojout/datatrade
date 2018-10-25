import exchange.providers.fix_yahoo_finance as yf

# should return None if not found
data = yf.download(["A","AAPL"], start="1999-01-01", auto_adjust = False, actions = True,)