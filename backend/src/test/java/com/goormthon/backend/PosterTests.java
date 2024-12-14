package com.goormthon.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PosterTests {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void flow() throws Exception {
    createPoster();
  }

  void createPoster() throws Exception {
    Resource img = new ClassPathResource("/test/img/1.jpg");
    Resource json = new ClassPathResource("/test/json/poster/addPoster.json");

    mockMvc.perform(multipart("/api/v1/poster")
        .file(new MockMultipartFile("img", // 요청에서 사용하는 파라미터 이름
            img.getFilename(), // 파일 이름
            MediaType.MULTIPART_FORM_DATA_VALUE, // MIME 타입
            img.getInputStream()))
        .file(new MockMultipartFile("request", // 요청에서 사용하는 파라미터 이름
            json.getFilename(), // 파일 이름
            MediaType.APPLICATION_JSON_VALUE,
            json.getInputStream()))
        .contentType(MediaType.MULTIPART_FORM_DATA))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.code").value(200))
        .andExpect(jsonPath("$.msg").value("SUCCESS"));
  }
}
