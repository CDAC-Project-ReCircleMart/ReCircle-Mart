package com.recirclemart.chat.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.recirclemart.chat.dto.view.ChatListView;
import com.recirclemart.chat.entity.Chat;

import java.util.List;

public interface ChatQueryRepository extends Repository<Chat, Integer> {

  @Query(value = """
        SELECT
          c.id AS id,
          c.listing_id AS listingId,
          c.buyer_id AS buyerId,
          c.seller_id AS sellerId,
          l.title AS title,

          CASE
            WHEN c.buyer_id = :userId THEN s.id
            ELSE b.id
          END AS otherId,

          CASE
            WHEN c.buyer_id = :userId THEN CONCAT(s.first_name, ' ', s.last_name)
            ELSE CONCAT(b.first_name, ' ', b.last_name)
          END AS otherName,

          CASE
            WHEN c.buyer_id = :userId THEN s.avatar
            ELSE b.avatar
          END AS otherAvatar

        FROM chats c
        JOIN listings l ON c.listing_id = l.id
        JOIN users b ON b.id = c.buyer_id
        JOIN users s ON s.id = c.seller_id

        WHERE c.buyer_id = :userId OR c.seller_id = :userId
        ORDER BY c.id DESC
      """, nativeQuery = true)
  List<ChatListView> getMyChats(@Param("userId") Integer userId);
}
