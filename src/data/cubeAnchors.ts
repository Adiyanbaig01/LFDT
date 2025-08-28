export type CubeAnchor = {
    id: string;
    pos: [number, number, number];
    jitter?: number;
    title: string;
    body: string;
};

export const cubeAnchors: CubeAnchor[] = [
    {
        id: "lfdt-01",
        pos: [-4.2, 1.5, 0], // Top left - bigger and positioned in green circle
        jitter: 0.4,
        title: "LFDT",
        body: "Open-source trust and blockchain collaboration under The Linux Foundation.",
    },
    {
        id: "events-01",
        pos: [-4.0, -1.0, 0], // Bottom left - bigger and positioned in green circle
        jitter: 0.3,
        title: "Events",
        body: "Workshops, hackathons, and talks that grow the community.",
    },
    {
        id: "blockchain-01",
        pos: [4.2, 1.7, 0], // Top right
        jitter: 0.5,
        title: "Blockchain",
        body: "Decentralized systems, consensus, and real-world protocols our club explores.",
    },
    {
        id: "community-01",
        pos: [4.2, -0.2, 0], // Middle right (adjusted up)
        jitter: 0.45,
        title: "Community",
        body: "Join our vibrant blockchain community.",
    },
    {
        id: "innovation-01",
        pos: [3.8, -2.0, 0], // Bottom right (adjusted up)
        jitter: 0.35,
        title: "Innovation",
        body: "Cutting-edge blockchain research and development.",
    },
];
