<?php

namespace FSchmidDev\CoreBundle\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

trait UserTrait
{
    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['user-profile'])]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user-profile'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['user-profile'])]
    private array $roles = [];

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user-profile'])]
    private ?string $fullName = null;

    #[ORM\Column]
    #[Gedmo\Timestampable(on: 'create')]
    #[Groups(['user-profile'])]
    private ?DateTimeImmutable $createdAt;

    #[ORM\Column]
    #[Gedmo\Timestampable(on: 'update')]
    #[Groups(['user-profile'])]
    private ?DateTimeImmutable $updatedAt;

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string)$this->username;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(?string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getAvatarUrl(): ?string
    {
        if (!$this->avatar) {
            return sprintf(
                'https://www.gravatar.com/avatar/%s?&d=%s&s=%d',
                md5(strtolower(trim($this->email))),
                urlencode(
                    sprintf(
                        'https://robohash.org/%s',
                        $this->username
                    )
                ),
                200
            );
        }

        if (str_starts_with($this->avatar, '/')) {
            return $this->avatar;
        }

        return sprintf('/uploads/avatars/%s', $this->avatar);
    }
}
