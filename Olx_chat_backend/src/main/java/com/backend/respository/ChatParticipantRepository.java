package com.backend.respository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.ChatParticipant;
import com.backend.entity.ChatRoom;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

	 Optional<ChatParticipant> findByChatRoomAndExternalUserId(
	            ChatRoom chatRoom,
	            Long externalUserId
	    );

	    List<ChatParticipant> findByExternalUserId(Long externalUserId);

	    List<ChatParticipant> findByChatRoom(ChatRoom chatRoom);
}
