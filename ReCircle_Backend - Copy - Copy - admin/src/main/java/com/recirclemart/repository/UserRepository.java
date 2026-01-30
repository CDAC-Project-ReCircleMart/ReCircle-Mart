//package com.recirclemart.repository;
//
//import com.recirclemart.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Integer> {
//
//    // Auth
//    Optional<User> findByEmail(String email);
//    boolean existsByEmail(String email);
//
//    // Admin dashboard
//    @Query("SELECT COUNT(u) FROM User u")
//    long countTotalUsers();
//
//    // Get all sellers (used in listings + admin)
//    List<User> findByRole(String role);
//    
//    
//    
//}




package com.recirclemart.repository;

import com.recirclemart.dtos.AdminUserRow;
import com.recirclemart.dtos.UsersChartPoint;
import com.recirclemart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

	Optional<User> findById(Integer sellerId);

	

	boolean existsByEmail(String email);
	
	@Query("SELECT COUNT(u) FROM User u")
	long countTotalUsers();
	
	  @Query(value = """
		      SELECT u.id as id, u.first_name as firstName, u.last_name as lastName, u.email as email,
		             u.avatar as avatar, u.role as role,
		             COUNT(l.id) as totalListings
		      FROM users u
		      LEFT JOIN listings l ON u.id = l.seller_id
		      GROUP BY u.id, u.first_name, u.last_name, u.email, u.avatar, u.role
		      ORDER BY u.id DESC
		      """, nativeQuery = true)
		    List<AdminUserRow> adminUsersWithListingCount();

		    @Query(value = """
		      SELECT DATE(created_at) as date, COUNT(*) as users
		      FROM users
		      GROUP BY DATE(created_at)
		      ORDER BY DATE(created_at)
		      """, nativeQuery = true)
		    List<UsersChartPoint> usersPerDay();
}
