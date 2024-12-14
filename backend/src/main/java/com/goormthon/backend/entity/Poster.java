package com.goormthon.backend.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.goormthon.backend.dto.req.AddPosterReq;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Getter
public class Poster {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String contents;
  private Long likeCount;

  @Column(columnDefinition = "TEXT")
  private String img;

  @Column(nullable = false)
  @CreatedDate
  private LocalDateTime createdAt;

  private Double latitude;
  private Double longitude;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "region_code")
  private Region region;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Enumerated(EnumType.STRING)
  private Category category;

  @OneToMany(mappedBy = "poster", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Comment> comments = new ArrayList<>();

  @Builder(access = AccessLevel.PRIVATE)
  private Poster(Long id, String title, String contents, Long likeCount, String img, LocalDateTime createdAt,
      Double latitude, Double longitude, Region region, User user, Category category, List<Comment> comments) {
    this.id = id;
    this.title = title;
    this.contents = contents;
    this.likeCount = likeCount;
    this.img = img;
    this.createdAt = createdAt;
    this.latitude = latitude;
    this.longitude = longitude;
    this.region = region;
    this.user = user;
    this.category = category;
    this.comments = comments;
  }

  public static Poster of(AddPosterReq posterReq, String img, User user) {
    return Poster.builder()
        .category(posterReq.getCategory())
        .title(posterReq.getTitle())
        .contents(posterReq.getContents())
        .latitude(posterReq.getLatitude())
        .longitude(posterReq.getLongitude())
        .img(img)
        .user(user)
        .build();
  }
}
