package com.goormthon.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goormthon.backend.dto.req.UserRegisterRequestDto;
import com.goormthon.backend.dto.req.UserUpdateRequestDto;
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

  @Transactional
  public UserRes register(UserRegisterRequestDto dto) {
    if (userRepository.existsByNickname(dto.getNickname())) {
      throw new IllegalArgumentException("중복된 닉네임입니다.");
    }
    if (userRepository.existsByEmail(dto.getEmail())) {
      throw new IllegalArgumentException("중복된 이메일입니다.");
    }

    User user = User.of(dto);
    userRepository.save(user);
    return UserRes.of(user);
  }

  public UserRes update(UserUpdateRequestDto dto) {
    Long userId = dto.getId();
    User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저"));
    user.update(dto.getNickname(), dto.getEmail(), dto.getPassword());

    return UserRes.of(user);
  }

  public void userDeleteById(Long id) {
    userRepository.deleteById(id);
  }

}
