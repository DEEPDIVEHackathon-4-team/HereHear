package com.goormthon.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.goormthon.backend.dto.req.AddPosterReq;
import com.goormthon.backend.dto.req.CommentRequestDto;
import com.goormthon.backend.dto.res.CommentResponseDto;
import com.goormthon.backend.dto.res.CommonRes;
import com.goormthon.backend.dto.res.PosterDetailResponseDto;
import com.goormthon.backend.dto.res.PosterResponseDto;
import com.goormthon.backend.entity.Comment;
import com.goormthon.backend.entity.Poster;
import com.goormthon.backend.service.CommentService;
import com.goormthon.backend.service.PosterService;

import java.io.IOException;
import com.goormthon.backend.entity.Category;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

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
@RequiredArgsConstructor
public class PosterController {

  private final PosterService posterService;
  private final CommentService commentService;

  @Tag(name = "Poster Controller", description = "map/board 화면 poster 조회 및 게시글수정삭제")
  @GetMapping("/map")
  public CommonRes<Page<PosterResponseDto>> getAllPosterOnMap(
      @RequestParam(required = false) Category category,
      @RequestParam(required = true) Double latitude,
      @RequestParam(required = true) Double longitude,
      @RequestParam(required = true) Double distance,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Page<PosterResponseDto> posters;
    if (category != null) {
      // 카테고리가 있을 경우
      posters = posterService.getAllPostersByCategoryOnMap(category, latitude, longitude, distance, page, size);
    } else {
      // 카테고리가 없을 경우
      posters = posterService.getAllPostersOnMap(latitude, longitude, distance, page, size);
    }

    return new CommonRes<>(200, "SUCCESS", posters);
  }

  @GetMapping("/board")
  public CommonRes<Page<PosterResponseDto>> getAllPosterOnBoard(
      @RequestParam(required = false) Category category,
      @RequestParam(required = true) String regionName,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<PosterResponseDto> posters;
    if (category != null) {
      // 카테고리가 있을 경우
      posters = posterService.getAllPostersByCategoryOnBoard(category, regionName, page, size);
    } else {
      // 카테고리가 없을 경우
      posters = posterService.getAllPostersOnBoard(regionName, page, size);
    }

    return new CommonRes<>(200, "SUCCESS", posters);
  }


  @GetMapping("/search")
  public CommonRes<?> getPoster(@RequestParam Long id) {
    PosterDetailResponseDto posterWithComments = posterService.getPosterWithComments(id);
    return new CommonRes<>(200, "SUCCESS", posterWithComments);
  }

  // @Operation(summary = "유저 생성", description = "유저를 등록합니다. 유저의 활동지는 추가 불가능")
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
  public CommonRes<?> addComment(@RequestBody CommentRequestDto commentRequestDto) {
    try {
      CommentResponseDto commentResponseDto = commentService.saveComment(commentRequestDto);
      return new CommonRes<>(200, "SUCCESS", commentResponseDto);
    } catch (Exception e) {
      return new CommonRes<>(400, "FAIL", null);
    }
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
