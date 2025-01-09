from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from routers import default_list, person, stock_list, stock_io, receive_log, qr_read

app = FastAPI()
app.include_router(default_list.router)
app.include_router(person.router)
app.include_router(stock_list.router)
app.include_router(stock_io.router)
app.include_router(receive_log.router)
app.include_router(qr_read.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
            "https://192.168.24.57:3000",
            "https://192.168.24.59:3000",
            "https://192.168.24.55:3000",
        ],  # 許可するオリジンを設定
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッド
    allow_headers=["*"],  # 許可するHTTPヘッダー
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=4000, 
        reload=True, 
        ssl_keyfile="../crt/server.key", 
        ssl_certfile="../crt/server.crt"
    )