# CodeAlpha_NetworkSniffer

A Python-based network packet sniffer built using **Scapy** that captures and analyzes live network traffic in real time.

## Features

- Captures live packets on your network interface
- Supports **TCP, UDP, ICMP, and ARP** protocols
- Displays source/destination **IP addresses and ports**
- Shows readable **payload content** (printable ASCII only)
- Auto-detects the default network interface

## Project Structure

```
CodeAlpha_NetworkSniffer/
├── sniffer.py        # Main packet capture and analysis script
├── requirements.txt  # Python dependencies
└── README.md         # Project documentation
```

## Requirements

- Python 3.x
- [Scapy](https://scapy.net/)
- [Npcap](https://npcap.com/#download) *(Windows only — required for packet capturing)*

## Installation

**1. Clone the repository:**
```bash
git clone https://github.com/<your-username>/CodeAlpha_NetworkSniffer.git
cd CodeAlpha_NetworkSniffer
```

**2. Install Python dependencies:**
```bash
pip install -r requirements.txt
```

**3. Install Npcap (Windows only):**

Download and install from: https://npcap.com/#download  
Keep all default options during installation.

## Usage

Run the sniffer as **Administrator** (required for raw packet access):

```bash
python sniffer.py
```

Press `Ctrl+C` to stop capturing.

## Sample Output

```
======================================================================
           NETWORK SNIFFER - Capture & Analyze Packets
======================================================================
Time       Proto | Source                -> Destination           | Payload
----------------------------------------------------------------------
[*] Sniffing on interface: Ethernet
[*] Press Ctrl+C to stop.

[13:12:21] UDP   | 172.30.62.49   :5353  -> 224.0.0.251    :5353  | Payload: _googlecast_tcplocal
[13:12:28] TCP   | 172.30.62.49   :63025 -> 109.176.239.0  :443
[13:12:28] TCP   | 109.176.239.0  :443   -> 172.30.62.49   :63025
[13:12:30] ARP   Request | 192.168.1.1     -> 192.168.1.5
```

## Protocol Reference

| Protocol | Description |
|----------|-------------|
| TCP | Transmission Control Protocol — reliable, connection-based |
| UDP | User Datagram Protocol — fast, connectionless |
| ICMP | Internet Control Message Protocol — ping/diagnostics |
| ARP | Address Resolution Protocol — IP to MAC mapping |

## ⚠️ Disclaimer

This tool is intended for **educational purposes only**. Only use it on networks you own or have explicit permission to monitor. Unauthorized packet sniffing may be illegal.

## Author

**Rubika M**  
Internship Project — CodeAlpha  
Task 1: Basic Network Sniffer
