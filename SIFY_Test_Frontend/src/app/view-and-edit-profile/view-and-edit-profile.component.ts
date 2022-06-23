import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MainService } from '../main.service';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-view-and-edit-profile',
  templateUrl: './view-and-edit-profile.component.html',
  styleUrls: ['./view-and-edit-profile.component.css'],
})
export class ViewAndEditProfileComponent implements OnInit {
  user: any;
  editprofile: boolean = true;
  mask: boolean = false;
  Profile = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    file: new FormControl('', Validators.required),
  });
  submitted: boolean = false;
  constructor(
    private sharedservice: SharedService,
    private mainservice: MainService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.sharedservice.changeData();
    this.sharedservice.data$.subscribe((userData: any) => {
      this.user = userData;
      if (userData.profilePic != null) {
        this.mask = true;
      }
      this.Profile.patchValue(userData);
    });
  }

  edit() {
    this.editprofile = false;
  }
  cancle() {
    this.editprofile = true;
  }

  // Convert Base64 cropped Image to File and Update Profile Service Method Call
  onSubmit() {
    this.submitted = true;
    if (this.Profile.valid) {
      const binary = atob(this.croppedImage.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      let imageBlob = new Blob([new Uint8Array(array)], {
        type: 'image/png',
      });
      const imageName = 'name.png';
      let imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

      let formData = new FormData();
      let data: any = this.Profile.value;
      data.id = this.user._id;
      for (let key in data) {
        formData.append(key, data[key]);
      }
      formData.append('file', imageFile);
      this.mainservice.updateUserProfile(formData).subscribe((user: any) => {
        this.editprofile = true;
        this.sharedservice.changeData();
      });
    }
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  deleteProfilepic() {
    this.mainservice.profilepicDelete(this.user).subscribe((delres: any) => {
      this.mask = false;
      this.sharedservice.changeData();
    });
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageLoadeda() {
    this.cropperReady = true;
  }
  imageLoadFailed() {}

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e: any) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }
}
