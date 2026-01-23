package com.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chat_participant" , uniqueConstraints  = {
		@UniqueConstraint( columnNames = {"chat_room_id" , "external_user_id"})
})
@Getter
@Setter

public class ChatParticipant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "participant_id")
	private Long participantId ; 
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "chat_room_id" , nullable= false )
	private ChatRoom chatRoom ; 
	
	
	@Column(name = "external_user_id", nullable = false)
	private Long externalUserId; 
	
	@Column(name = "joined_at", nullable = false)
	private LocalDateTime joinedAt; 
	
}
