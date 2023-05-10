import ytdl from 'ytdl-core';
import ffmpeg from "fluent-ffmpeg";
import * as fs from 'fs';
import * as path from 'path';

export class VideoDownloader {
    
    constructor() {}

    static download(
        url:string
    ): string | null {

        console.log("Received URL: " + url)
        try {
            // Download the video as a stream
            const videoStream = ytdl(url, { filter: 'audioonly' });

            // Convert the video stream to a .wav audio stream
            const audioStream = ffmpeg(videoStream)
                .audioFrequency(16000)
                .audioChannels(1)
                .format('wav')
                .on('error', (err:any) => {
                console.error(`Error converting video to audio: ${err.message}`);
                });
                
            // Save the audio stream to a file
            const outputFileStream = fs.createWriteStream("./audio.wav");
            audioStream.pipe(outputFileStream);
            
            return "audio.wav";

        } catch (e: any) {
            console.log(e);
            return null;
        }
    }

    splitAudio(inputAudioPath: string, outputDir: string, segmentDuration: number) {
        ffmpeg.ffprobe(inputAudioPath, (err:any, metadata:any) => {
          if (err) {
            console.error(err);
            return;
          }
      
          const duration = metadata.format.duration;
          const numSegments = Math.ceil(duration / segmentDuration);
      
          for (let i = 0; i < numSegments; i++) {
            const outputFileName = `segment_${i}.wav`;
            const outputPath = path.join(outputDir, outputFileName);
      
            ffmpeg(inputAudioPath)
              .setStartTime(i * segmentDuration)
              .setDuration(segmentDuration)
              .output(outputPath)
              .on("start", () => console.log(`Started creating ${outputFileName}`))
              .on("error", (err:any) =>
                console.error(`Error creating ${outputFileName}: ${err}`)
              )
              .on("end", () => console.log(`Finished creating ${outputFileName}`))
              .run();
          }
        });
      }
}