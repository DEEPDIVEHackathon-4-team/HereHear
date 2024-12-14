package com.goormthon.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.goormthon.backend.dto.req.PosterReq;
import com.goormthon.backend.entity.Poster;
import com.goormthon.backend.repository.PosterRepository;

@Service
public class PosterService {

  @Autowired
  private PosterRepository posterRepository;

  public Poster findById(Long id){
    return posterRepository.findById(id).orElseThrow();
  }
  
  public void save(PosterReq data, MultipartFile img){
    posterRepository.save(Poster.of(data));
  }

  public Page<Poster> findAll(Double latitude, Double longitude, Double distance, int page, int size){
    Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
    return posterRepository.findWithinDistance(latitude, longitude, distance, pageable);
  }

  public void delete(Long id){
    posterRepository.deleteById(id);
  }
}
