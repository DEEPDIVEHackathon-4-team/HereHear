package com.goormthon.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.goormthon.backend.dto.req.AddPosterReq;
import com.goormthon.backend.dto.res.CommonRes;
import com.goormthon.backend.entity.Poster;
import com.goormthon.backend.service.PosterService;

import java.io.IOException;
import com.goormthon.backend.entity.Category;

import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/poster")
public class PosterController {

  @Autowired
  private PosterService posterService;

  @GetMapping("")
  public CommonRes<Page<Poster>> getAllPoster(@RequestParam Category category,
      @RequestParam(required = true) Double latitude,
      @RequestParam(required = true) Double longitude,
      @RequestParam(required = true) Double distance,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    CommonRes<Page<Poster>> res = null;
    try {
      Page<Poster> data = posterService.findAll(latitude, longitude, distance, page, size);
      res = new CommonRes<>(200, "SUCCESS", data);
    } catch (Exception e) {
      e.printStackTrace();
      res = new CommonRes<>(400, "BAD REQUEST", null);
    }
    return res;
  }

  @GetMapping("/search")
  public CommonRes<Poster> getPoster(@RequestParam Long id) {
    CommonRes<Poster> res = null;
    try {
      Poster data = posterService.findById(id);
      ;
      res = new CommonRes<>(200, "SUCCESS", data);
    } catch (Exception e) {
      res = new CommonRes<>(400, "BAD REQUEST", null);
    }
    return res;
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public CommonRes<?> addPoster(
      @RequestPart("request") @Parameter(description = "포스터 데이터(JSON)") AddPosterReq request,
      @RequestPart(value = "img", required = false) @Parameter(description = "이미지 파일") MultipartFile img) {
    try {
      posterService.add(request, img);
      return new CommonRes<>(200, "SUCCESS", null);
    } catch (IOException e) {
      return new CommonRes<>(400, "IMG UPLOAD ERROR", null);
    }
  }

  @PutMapping("")
  public String updatePoster(@PathVariable String id, @RequestBody String entity) {
    return "";
  }

  @DeleteMapping("")
  public CommonRes<Long> deletePoster(@RequestParam Long id) {
    CommonRes<Long> res = new CommonRes<>();
    try {
      posterService.delete(id);
      res = new CommonRes<>(200, "SUCCESS", id);
    } catch (Exception e) {
      res = new CommonRes<>(400, "BAD REQUEST", null);
    }
    return res;
  }

  @GetMapping("/comment")
  public String getComment(@RequestParam String param) {
    return new String();
  }

  @PostMapping("/comment")
  public String addComment(@RequestBody String entity) {
    // TODO: process POST request
    return "";
  }

  @PutMapping("/comment")
  public String updateComment(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return "";
  }

  @DeleteMapping("/comment")
  public String deleteComment(@PathVariable String id) {
    // TODO: process PUT request

    return "";
  }
}
