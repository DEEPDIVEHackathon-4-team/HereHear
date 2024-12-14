package com.goormthon.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goormthon.backend.dto.req.UserReq;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  @Transactional(readOnly = true)
  public List<UserRes> userFindAll(){
    List<User> users = userRepository.findAll();
    return users.stream().map(UserRes::of).toList();
  }

  @Transactional(readOnly = true)
  public UserRes userFindById(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    return UserRes.of(user);
  }

  public void register(UserReq userReq) {

  }

  public void userDeleteById(Long id){
    userRepository.deleteById(id);
  }

}
