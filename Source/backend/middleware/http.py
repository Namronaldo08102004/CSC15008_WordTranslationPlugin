import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from backend.utils.logger import Logger

LOGGER = Logger(__file__, log_file = "http.log")

class LogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        LOGGER.log.info(
            f"{request.client.host} - \"{request.method} {request.url.path} {request.scope['http_version']}\" {response.status_code} {process_time:.2f}s")
        
        return response