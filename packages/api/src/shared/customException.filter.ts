import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = 500; // Default status code for unhandled exceptions
    let message: any = 'Internal Server Error';

    if (exception instanceof HttpException) {
      // If it's an HttpException, extract the status and message
      status = exception.getStatus();
      message = exception.getResponse() || message;
    }

    // Customize the error response format as per your requirement
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
