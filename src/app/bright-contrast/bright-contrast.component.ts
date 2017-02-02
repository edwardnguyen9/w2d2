import {Component, OnInit} from '@angular/core';
import {ImageService} from "../services/image.service";

@Component({
  selector: 'app-bright-contrast',
  templateUrl: './bright-contrast.component.html',
  styleUrls: ['./bright-contrast.component.css']
})
export class BrightContrastComponent implements OnInit {

  private contrast: any = 1;
  private brightness: any = 0;

  constructor(private imageService: ImageService) {
  }

  private autoContrast = () => {
    let temp = [255, 0, 255, 0, 255, 0];
    for (let i = 0; i < this.imageService.numPixels; i++) {
      if (this.imageService.pixels[i * 4] < temp[0]) { temp[0] = this.imageService.pixels[i * 4]; }
      if (this.imageService.pixels[i * 4] > temp[1]) { temp[1] = this.imageService.pixels[i * 4]; }
      if (this.imageService.pixels[i * 4 + 1] < temp[2]) { temp[2] = this.imageService.pixels[i * 4 + 1]; }
      if (this.imageService.pixels[i * 4 + 1] > temp[3]) { temp[3] = this.imageService.pixels[i * 4 + 1]; }
      if (this.imageService.pixels[i * 4 + 2] < temp[4]) { temp[4] = this.imageService.pixels[i * 4 + 2]; }
      if (this.imageService.pixels[i * 4 + 2] > temp[5]) { temp[5] = this.imageService.pixels[i * 4 + 2]; } 
    }
    for (let i = 0; i < this.imageService.numPixels; i++) {
      this.imageService.pixels[i * 4] = (this.imageService.pixels[i * 4] - temp[0]) / (temp[1] - temp[0]) * 255; // Red
      this.imageService.pixels[i * 4 + 1] = (this.imageService.pixels[i * 4 + 1] - temp[2]) / (temp[3] - temp[2]) * 255; // Green
      this.imageService.pixels[i * 4 + 2] = (this.imageService.pixels[i * 4 + 2] - temp[4]) / (temp[5] - temp[4]) * 255; // Blue
    }
    this.imageService.context.clearRect(0, 0, this.imageService.canvas.width, this.imageService.canvas.height);
    this.imageService.context.putImageData(this.imageService.imageData, 0, 0);
  }

  private brightContrast = () => {
    //this.contrast = parseInt(this.contrast);
    //this.brightness = parseInt(this.brightness);
    for (let i = 0; i < this.imageService.numPixels; i++) {
      this.imageService.pixels[i * 4] = (this.imageService.pixels[i * 4] - 128) * this.contrast + 128 + this.brightness; // Red
      this.imageService.pixels[i * 4 + 1] = (this.imageService.pixels[i * 4 + 1] - 128) * this.contrast + 128 + this.brightness; // Green
      this.imageService.pixels[i * 4 + 2] = (this.imageService.pixels[i * 4 + 2] - 128) * this.contrast + 128 + this.brightness; // Blue
    }

    this.imageService.context.clearRect(0, 0, this.imageService.canvas.width, this.imageService.canvas.height);
    this.imageService.context.putImageData(this.imageService.imageData, 0, 0);

  };

  ngOnInit() {
    this.imageService.functions.brightContrast = this.brightContrast;
  }

}
