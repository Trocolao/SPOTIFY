import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  post!: Post;
  image: string = "";
  categoria: number = 0;

  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
      this.categoria = this.post.categoria_id
      this.image = this.serverURL + this.post.files[0].file_path;
      console.log(this.image)
    });
  }

  firma(id: Number) {
    this.postService.firmar(id).subscribe((data: Post) => {
      this.post = data;
      this.router.navigateByUrl('post/index');
    })
  }

}