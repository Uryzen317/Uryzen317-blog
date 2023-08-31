import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join, resolve } from 'path';

@Controller('download')
export class DownloadController {
    // send files to client
    @Get('/:id')
    send(@Param('id') id: string, @Res() res: Response): void {
        try {
            res.sendFile(join(__dirname, '..', '..', '..', 'files', id))
        } catch (err) { console.log('error providing assests to client.') }
    }

    // force download
    @Get('force/:id')
    download(@Param('id') id: string, @Res() res: Response): void {
        try {
            res.download(join(__dirname, '..', '..', '..', 'files', id))
        } catch (err) { console.log('error providing assests to client.') }
    }
}
