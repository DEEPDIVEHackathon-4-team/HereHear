package com.goormthon.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goormthon.backend.dto.req.CommentRequestDto;
import com.goormthon.backend.dto.res.CommentResponseDto;
import com.goormthon.backend.entity.Comment;
import com.goormthon.backend.entity.Poster;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.CommentRepository;
import com.goormthon.backend.repository.PosterRepository;
import com.goormthon.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final PosterRepository posterRepository;
	private final UserRepository userRepository;

	public List<CommentResponseDto> findByPostId(Long postId) {
		List<Comment> comments = commentRepository.findAllByPosterId(postId);
		return comments.stream().map(CommentResponseDto::of).toList();
	}

	@Transactional
	public CommentResponseDto saveComment(CommentRequestDto dto) {
		Long userId = dto.getUserId();
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

		Long posterId = dto.getPosterId();
		Poster poster = posterRepository.findById(posterId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글 입니다"));

		Comment comment = Comment.of(dto, poster, user);
		commentRepository.save(comment);

		return CommentResponseDto.of(comment);
	}
}
