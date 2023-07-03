<?php

namespace FSchmidDev\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppsController extends AbstractController
{
    #[Route('/apps', name: 'fschmiddev_core_apps')]
    public function apps(): Response
    {
        return $this->render('@FSchmidDevCore/apps/apps.html.twig');
    }
}
