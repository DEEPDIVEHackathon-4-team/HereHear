package com.goormthon.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/v1/poster")
public class PosterController {
  
  @GetMapping("")
  public String getPoster(@RequestParam String param) {
      return new String();
  }

  @PostMapping("")
  public String addPoster(@RequestBody String entity) {
      //TODO: process POST request
      return "";
  }
  
  @PutMapping("")
  public String updatePoster(@PathVariable String id, @RequestBody String entity) {
      //TODO: process PUT request
      
      return "";
  }
 
  @DeleteMapping("")
  public String deletePoster(@PathVariable String id) {
      //TODO: process PUT request
      
      return "";
  }
  
  @GetMapping("/comment")
  public String getComment(@RequestParam String param) {
      return new String();
  }

  @PostMapping("/comment")
  public String addComment(@RequestBody String entity) {
      //TODO: process POST request
      return "";
  }
  
  @PutMapping("/comment")
  public String updateComment(@PathVariable String id, @RequestBody String entity) {
      //TODO: process PUT request
      
      return "";
  }
 
  @DeleteMapping("/comment")
  public String deleteComment(@PathVariable String id) {
      //TODO: process PUT request
      
      return "";
  }
}
