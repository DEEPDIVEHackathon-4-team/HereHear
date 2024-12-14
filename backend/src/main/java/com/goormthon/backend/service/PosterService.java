package com.goormthon.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.goormthon.backend.dto.req.AddPosterReq;
import com.goormthon.backend.dto.res.CommentResponseDto;
import com.goormthon.backend.dto.res.PosterDetailResponseDto;
import com.goormthon.backend.dto.res.PosterResponseDto;
import com.goormthon.backend.entity.Category;
import com.goormthon.backend.entity.Poster;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.CommentRepository;
import com.goormthon.backend.repository.PosterRepository;
import com.goormthon.backend.repository.UserRepository;
import com.goormthon.backend.utils.FileUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PosterService {

  private final PosterRepository posterRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;

  public Poster findById(Long id) {
    return posterRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 ID의 게시글"));
  }

  public PosterDetailResponseDto getPosterWithComments(Long posterId) {
    Poster poster = posterRepository.findById(posterId)
        .orElseThrow(() -> new IllegalArgumentException("Poster not found"));

    List<CommentResponseDto> comments = commentRepository.findByPosterId(posterId).stream()
        .map(CommentResponseDto::of)
        .toList();

    return PosterDetailResponseDto.of(poster, comments);
  }

  @Transactional
  public void add(AddPosterReq data, MultipartFile img) throws IOException {
    User user = userRepository.findById(data.getUserId()).orElseThrow();

    String base64 = img == null ? null : FileUtils.convertToBase64(img);
    Poster poster = Poster.of(data, base64, user);

    posterRepository.save(poster);
  }

  // public void update(UpdatePosterReq data, MultipartFile img){
  // Poster poster = posterRepository.findById(data.getId()).orElseThrow();
  // Location location =
  // locationRepository.findByLatitudeAndLongtitude(data.get).;
  // User user = userRepository.findById(data.getUserId()).orElseThrow();
  // posterRepository.save(Poster.of(data,user, ));
  // }
  //
  // public Page<Poster> findAll(Double latitude, Double longitude, Double distance, int page, int size) {
  //   Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
  //   Page<Poster> queryResult = posterRepository.findPostersWithinDistance(latitude, longitude, distance, pageable);
  //   return queryResult;
  // }

  @Transactional
  public void delete(Long id) {
    posterRepository.deleteById(id);
  }

  public Page<PosterResponseDto> getAllPostersByCategoryOnMap(
      Category category,
      Double latitude,
      Double longitude,
      Double distance,
      int page,
      int size
  ) {
    Pageable pageable = PageRequest.of(page, size);

    Page<Poster> posters = posterRepository.findByCategoryAndDistance(category, latitude, longitude, distance, pageable);
    return posters.map(PosterResponseDto::of);
  }

  public Page<PosterResponseDto> getAllPostersOnMap(Double latitude, Double longitude, Double distance, int page, int size) {
    // 카테고리 조건 제외한 검색
    Page<Poster> posters = posterRepository.findPostersByLocation(latitude, longitude, distance,
        PageRequest.of(page, size));
    return posters.map(PosterResponseDto::of);
  }

  public Page<PosterResponseDto> getAllPostersByCategoryOnBoard(
      Category category,
      String regionName,
      int page,
      int size
  ) {
    Pageable pageable = PageRequest.of(page, size);

    Page<Poster> posters = posterRepository.findByCategoryAndRegionName(category, regionName, pageable);
    return posters.map(PosterResponseDto::of);
  }

  public Page<PosterResponseDto> getAllPostersOnBoard(
      String regionName,
      int page,
      int size
  ) {

    Pageable pageable = PageRequest.of(page, size);

    Page<Poster> posters = posterRepository.findByRegionName(regionName, pageable);
    return posters.map(PosterResponseDto::of);
  }


}
