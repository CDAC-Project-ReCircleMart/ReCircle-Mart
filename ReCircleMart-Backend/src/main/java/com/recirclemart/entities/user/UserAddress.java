package com.recirclemart.entities.user;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_address")
@Getter
@Setter

public class UserAddress {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name  = "user_address_id")
	private Long userAddressId; 
	
	


	    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	    @JoinColumn(name = "user_id", nullable = false)
	    private Users user;
	    
	    @ManyToOne(cascade = CascadeType.ALL , fetch = FetchType.LAZY)
	    @JoinColumn(name = "address_id", nullable = false)
	    private Address address;

	    @Column(name = "address_type", length = 20)
	    private String addressType; // e.g., 'HOME', 'OFFICE', 'LISTING'
	
	
}
