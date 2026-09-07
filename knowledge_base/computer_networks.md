# Computer Networks Knowledge Base

## OSI Model

### Concept
The Open Systems Interconnection (OSI) model is a seven-layer conceptual framework used to understand how network communication takes place.

### Working Principle
The OSI model divides network communication into seven layers:

1. Physical - transmits raw bits through the communication medium.
2. Data Link - provides node-to-node delivery and framing.
3. Network - handles logical addressing and routing.
4. Transport - provides end-to-end delivery and reliability.
5. Session - manages communication sessions.
6. Presentation - handles data formatting, encryption, and compression.
7. Application - provides network services to applications.

### Important Properties
- Provides a structured approach to understanding networking.
- Each layer performs specific functions.
- Layers interact with adjacent layers.
- Helps in network troubleshooting and protocol design.

### Laboratory Requirements
- Computer or laptop
- Network simulation software such as Cisco Packet Tracer or equivalent
- Basic networking knowledge

### Common Precautions
- Understand the responsibility of each layer.
- Do not confuse OSI layers with TCP/IP layers.
- Identify protocols and devices according to their functions.

### Viva Topics
- What is the OSI model?
- How many layers are present in the OSI model?
- What is the function of the Network layer?
- What is the role of the Transport layer?
- Which layer is responsible for physical transmission?


## TCP/IP

### Concept
The TCP/IP model is a networking framework used to describe communication over the Internet and other computer networks.

### Working Principle
TCP/IP commonly uses four layers:

1. Network Access - handles communication over the physical and data-link network.
2. Internet - provides logical addressing and routing using protocols such as IP.
3. Transport - provides end-to-end communication using protocols such as TCP and UDP.
4. Application - provides network services to applications using protocols such as HTTP, DNS, and SMTP.

### Important Properties
- TCP provides reliable, connection-oriented communication.
- UDP provides connectionless communication with lower overhead.
- IP provides logical addressing and routing.
- TCP/IP is the foundation of Internet communication.

### Laboratory Requirements
- Computer or laptop
- Network simulation software or network tools
- Basic knowledge of IP addressing

### Common Precautions
- Distinguish TCP from UDP.
- Use valid IP addresses.
- Understand the difference between transport and Internet-layer functions.
- Verify network connectivity during experiments.

### Viva Topics
- What is TCP/IP?
- What is the difference between TCP and UDP?
- What is the function of IP?
- What is an IP address?
- What are the layers of the TCP/IP model?


## IP Addressing

### Concept
An IP address is a logical address assigned to a device or network interface to identify it on an IP network.

### Working Principle
IPv4 addresses are 32-bit addresses commonly represented in dotted-decimal notation, such as 192.168.1.10.

An IPv4 address consists of a network portion and a host portion, determined by the subnet mask or prefix length.

### Important Properties
- IPv4 uses 32-bit addresses.
- IPv6 uses 128-bit addresses.
- Private IPv4 addresses are commonly used within local networks.
- A subnet mask identifies the network and host portions of an IPv4 address.

### Laboratory Requirements
- Computer or laptop
- Network configuration tools
- Network simulator or operating-system networking commands

### Common Precautions
- Use valid addresses for the selected network.
- Avoid assigning the same IP address to multiple devices.
- Configure the correct subnet mask.
- Verify the default gateway when communication outside the local network is required.

### Viva Topics
- What is an IP address?
- What is IPv4?
- What is IPv6?
- What is a subnet mask?
- What is a private IP address?


## Subnetting

### Concept
Subnetting is the process of dividing a larger IP network into smaller logical networks called subnets.

### Working Principle
Subnetting borrows host bits to create additional network bits. The subnet mask or prefix length determines the size of each subnet.

For an IPv4 network with a prefix length of /24:
- Total addresses = 256
- Usable host addresses are typically 254 in a traditional subnet when network and broadcast addresses are reserved.

### Algorithm Steps
1. Identify the original network address.
2. Determine the number of required subnets or hosts.
3. Select an appropriate subnet mask or prefix length.
4. Calculate the subnet ranges.
5. Identify network and broadcast addresses.
6. Determine usable host ranges.

### Important Properties
- Reduces broadcast-domain size.
- Improves address organization.
- Supports efficient IP address allocation.
- Prefix length determines the number of addresses in a subnet.

### Laboratory Requirements
- Calculator or subnetting tool
- Network simulator
- Basic knowledge of IPv4 addressing

### Common Precautions
- Calculate network and broadcast addresses correctly.
- Do not assign reserved addresses to hosts.
- Verify the subnet mask for every network.
- Check that the number of hosts fits within the subnet.

### Viva Topics
- What is subnetting?
- Why is subnetting used?
- What is a subnet mask?
- What is CIDR?
- What is the difference between a network address and broadcast address?


## Routing

### Concept
Routing is the process of selecting paths for packets to travel from a source network to a destination network.

### Working Principle
Routers examine destination IP addresses and use routing tables to determine the next hop or outgoing interface for packets.

Routing can be:
- Static routing
- Dynamic routing

Common dynamic routing protocols include RIP, OSPF, and BGP.

### Algorithm Steps
1. Receive a packet.
2. Examine the destination IP address.
3. Search the routing table for the best matching route.
4. Select the appropriate next hop or interface.
5. Forward the packet toward the destination.

### Important Properties
- Routers operate primarily at the Network layer.
- Routing tables contain information about reachable networks.
- Dynamic routing protocols can automatically exchange routing information.
- Static routes are manually configured.

### Laboratory Requirements
- Computer or laptop
- Network simulator such as Cisco Packet Tracer
- Routers and network devices
- Basic IP addressing knowledge

### Common Precautions
- Configure correct destination networks.
- Verify routing-table entries.
- Check next-hop addresses.
- Test connectivity after configuring routes.

### Viva Topics
- What is routing?
- What is a router?
- What is a routing table?
- Difference between static and dynamic routing?
- What is the purpose of OSPF?


## Network Topologies

### Concept
Network topology describes how devices and communication links are arranged in a computer network.

### Working Principle
Common network topologies include:
- Bus
- Star
- Ring
- Mesh
- Tree
- Hybrid

### Important Properties
- Star topology connects devices to a central device such as a switch.
- Bus topology uses a shared communication medium.
- Ring topology connects devices in a circular arrangement.
- Mesh topology provides multiple paths between devices.
- Hybrid topology combines characteristics of multiple topologies.

### Advantages and Limitations
- Star topology is easy to manage, but failure of the central device can affect connected devices.
- Bus topology requires less cabling, but failure or problems with the shared medium can affect communication.
- Mesh topology provides redundancy, but requires more connections and infrastructure.

### Laboratory Requirements
- Computer or laptop
- Network simulation software
- Network devices and connection media

### Common Precautions
- Select topology according to network requirements.
- Connect devices correctly.
- Check cable and interface configuration.
- Test connectivity between devices.

### Viva Topics
- What is network topology?
- What is star topology?
- What is mesh topology?
- Which topology uses a central device?
- What are the advantages of mesh topology?