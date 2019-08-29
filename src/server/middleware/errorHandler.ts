import { Response } from 'express'
import path from 'path'

const errorHandler = (err: Error, req: any, res: Response, next: any) =>
  res.status(404).json({
    message: err.message,
    stack:
      // print a nicer stack trace by splitting line breaks and making them array items
      process.env.NODE_ENV === 'development' &&
      (err.stack || '')
        .split('\n')
        .map((line: string) => line.trim())
        .map((line: string) => line.split(path.sep).join('/'))
        .map((line: string) =>
          line.replace(
            process
              .cwd()
              .split(path.sep)
              .join('/'),
            '.'
          )
        ),
    status: 'error'
  })

export default errorHandler
