package com.goormthon.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.dto.req.UserRegisterRequestDto;
import com.goormthon.backend.dto.req.UserUpdateRequestDto;
import com.goormthon.backend.dto.res.CommonRes;
import com.goormthon.backend.dto.res.UserRegisterResponseDto;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.service.LocationService;
import com.goormthon.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;

@Tag(name = "User Controller", description = "유저 조회, 모든 유저 조회, 등록, 수정, 삭제 및 활동지 추가 API 제공")
@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;
  private final LocationService locationService;

  @Operation(summary = "유저 생성", description = "유저를 등록합니다. 유저의 활동지는 추가 불가능")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "유저 생성 성공", content = @Content(schema = @Schema(implementation = CommonRes.class))),
      @ApiResponse(responseCode = "400", description = "중복 닉네임이거나 중복 이메일이면 생성 불가", content = @Content(schema = @Schema(implementation = CommonRes.class))),
      @ApiResponse(responseCode = "500", description = "서버 오류 발생", content = @Content(schema = @Schema(implementation = Exception.class)))
  })
  @PostMapping("")
  public CommonRes<?> addUser(@RequestBody UserRegisterRequestDto dto) {
    UserRegisterResponseDto responseDto = userService.register(dto);
    return new CommonRes<>(200, "SUCCESS", responseDto);
  }

  @GetMapping
  public CommonRes<?> getUser(@RequestParam Long id) {
    try {
      UserRes data = userService.userFindById(id);
      return new CommonRes<>(200, "SUCCESS", data);
    } catch (Exception e) {
      return new CommonRes<>(400, "Bad Request", null);
    }
  }

  @GetMapping("/all")
  public CommonRes<?> getAllUsers() {
    List<UserRes> users = userService.userFindAll();
    return new CommonRes<>(200, "SUCCESS", users);
  }

  @PutMapping("")
  public CommonRes<?> update(@RequestBody UserUpdateRequestDto dto) {
    UserRes userRes = userService.update(dto);
    return new CommonRes<>(200, "SUCCESS", userRes);
  }

  @DeleteMapping("")
  public CommonRes<?> deleteUser(@RequestParam Long id) {
    userService.userDeleteById(id);
    return new CommonRes<>(200, "SUCCESS", null);
  }

  @PostMapping("/location")
  public CommonRes<?> addLocation(@RequestBody LocationReq dto) {
    UserRes userRes = locationService.userLocationSave(dto);
    return new CommonRes<>(200, "SUCCESS", userRes);
  }

}
