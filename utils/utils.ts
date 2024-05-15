// utils/qrcodeGenerator.ts
import fs from 'fs';
import qr from 'qrcode';

// const fs = require('fs');
// const qr = require('qrcode');

async function generateQRCode(data: string, filePath: string): Promise<boolean> {
    try {
        const qrData = await qr.toDataURL(data);
        const base64Data = qrData.replace(/^data:image\/png;base64,/, '');

        fs.writeFileSync(filePath, base64Data, 'base64');
        return true;
    } catch (error) {
        console.error('Error generating QR code:', error);
        return false;
    }
}

export default generateQRCode;
